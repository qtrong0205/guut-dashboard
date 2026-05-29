import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import project from './schemas/project'
import post from './schemas/post'
import teamMember from './schemas/teamMember'
import siteSetting from './schemas/siteSetting'
import bannerItem from './schemas/bannerItem'

export default defineConfig({
  name: 'default',
  title: 'Guu & T',
  projectId: '08k96exq',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {types: [project, post, teamMember, siteSetting, bannerItem]},
})
