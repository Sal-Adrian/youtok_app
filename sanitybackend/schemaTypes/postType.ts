import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'likes',
      type: 'array',
      of: [
      {
        type: 'reference',
        to: [{ type: 'user' }],
      },
      ],
    }),
    defineField({
      name: 'comments',
      type: 'array',
      of: [{ type: 'comment' }],
    }),
  ],
})