import {defineField, defineType} from 'sanity'

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'postedBy',
      type: 'postedBy',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'comment',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})