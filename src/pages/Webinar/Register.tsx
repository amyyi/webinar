import { apiFavoritePosts } from '@/apis/post'
import { Box } from '@/components'
import { Field, Form, Input, Select } from '@/components/Form'
import { WebError } from '@/services/base'
import { ConvertedPost } from '@/shared/PermissionRoute/types'
import { entries } from 'lodash'
import { ChangeEvent, ForwardRefRenderFunction, forwardRef, useEffect, useState } from 'react'

interface RegisterProps {
  post?: string
  posts: ConvertedPost
  updatePost: (id: number, page: number) => void
}

const initialForm = {
  titleValue: '', // format: 'id,current_page'
  firstName: '',
  lastName: '',
  email: '',
}

const _Register: ForwardRefRenderFunction<HTMLDivElement, RegisterProps> = (
  { post, posts, updatePost },
  ref,
) => {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState<WebError | null>(null)
  const isDisabled = entries(formData).some(([_, value]) => !value.length)

  useEffect(() => {
    post &&
      setFormData((prev) => ({
        ...prev,
        titleValue: post,
      }))
  }, [post])

  const resetForm = (): void => {
    setFormData(initialForm)
  }

  const handleSubmit = (): void => {
    const [id, page] = formData.titleValue.split(',')
    apiFavoritePosts({ id: parseInt(id, 10) })
      .then(() => {
        updatePost(parseInt(id, 10), parseInt(page, 10))
        resetForm()
      })
      .catch((error) => setError(error))
  }
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
    !!error && setError(null)
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Box ref={ref}>
      <Form
        title="Register for a Webinar now"
        subtitle="Please fill in the form below and you will be contacted by one of our professional business experts."
        errorMessage={error?.message}
        buttonProps={{
          title: 'Register',
          disabled: isDisabled,
          onClick: handleSubmit,
        }}
      >
        <Field label="Topic">
          <Select value={formData.titleValue} name="titleValue" onChange={handleChange}>
            {posts.map((post) => (
              <option key={post.id} value={[post.id.toString(), post.current_Page.toString()]}>
                {post.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="First Name">
          <Input value={formData.firstName} name="firstName" onChange={handleChange} />
        </Field>
        <Field label="Last Name">
          <Input value={formData.lastName} name="lastName" onChange={handleChange} />
        </Field>
        <Field label="Email">
          <Input value={formData.email} name="email" onChange={handleChange} />
        </Field>
      </Form>
    </Box>
  )
}

export const Register = forwardRef(_Register)
