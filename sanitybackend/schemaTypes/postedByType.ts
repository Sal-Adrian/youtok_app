import {defineType} from 'sanity'

export const postedByType = defineType({
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference',
  to: [{type: 'user'}]
})