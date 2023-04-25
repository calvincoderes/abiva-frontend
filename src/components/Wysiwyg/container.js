/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const clearState = { status: 0, payload: null }

const Container = ({ children, index, initialDescription, currentTab, handleOnChange }) => {
  const { quill, quillRef } = useQuill()

  // State
  const state = useStoreState(s => ({
    createdImage: s.createdImage
  }))

  // Actions
  const actions = useStoreActions(a => ({
    createImage: a.createImage,
    setCreatedImage: a.setCreatedImage
  }))

  const selectLocalImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      const file = input.files[0]
      const formData = new FormData()
      formData.append('image', file)
      actions.createImage(formData)
    }
  }

  const insertToEditor = (url) => {
    const range = quill.getSelection()
    // quill.insertEmbed(range.index, 'image', url)
    // const range = quill.getSelection()
    quill.insertEmbed(range.index, 'image', url)
  }

  useEffect(() => {
    const { status, payload } = state.createdImage
    if (status === 2 && currentTab === index) {
      insertToEditor(payload.image)
      actions.setCreatedImage(clearState)
    } else if (status === 3) {
      actions.setCreatedImage(clearState)
    }
  }, [state.createdImage])

  useEffect(() => {
    if (quill && currentTab === index) {
      initialDescription && quill.clipboard.dangerouslyPasteHTML(initialDescription)
      quill.on('text-change', () => {
        handleOnChange('content_description', currentTab, quill.root.innerHTML)
      })
      quill.getModule('toolbar').addHandler('image', selectLocalImage)
    }
  }, [quill, index, currentTab])

  return children({
    state,
    quillRef
  })
}

export default Container
