/*
 * @Date: 2024-03-22 16:41:04
 * @LastEditors: phil_litian
 */

interface GroupItem {
  title: string,
  desc: string,
  icon: string,
  date: string,
  group: string
}

interface DynamicItem {
  name: string,
  desc: string,
  avatar: string,
  date: string
}

interface navItem {
  title: string,
  icon: string,
  color: string
}

export const GroupList: GroupItem[] = [
  { title: 'Github', desc: '机会不是等出来的，而是创造出来的', group: '开源', date: '2024-03-22', icon: 'mdi:github' },
  { title: 'Vue', desc: '现在的你决定将来的你', group: '工具', date: '2024-03-22', icon: 'logos:vue' },
  { title: 'Html5', desc: "没有什么才能是比努力更加重要的", group: 'UI', date: '2024-03-22', icon: 'devicon:html5' },
  { title: 'Angular', desc: '兴趣是最好的老师', group: '工具', date: '2024-03-22', icon: 'devicon:angular' },
  { title: 'React', desc: '健康的身体是实现目标的基石', group: '工具', date: '2024-03-22', icon: 'logos:react' },
  { title: 'Js', desc: '路是靠脚踏实地一步一步走出来的', group: '架构', date: '2024-03-22', icon: 'vscode-icons:file-type-js-official' },
]

export const DynamicInfoList: DynamicItem[] = [
  { name: 'phil', desc: '刚刚编写了一个Vue3的开源项目', date: '刚刚', avatar: 'dynamic-avatar-1|svg' },
  { name: 'rose', desc: '关注了<a>phil</a>', date: '一小时前', avatar: 'dynamic-avatar-2|svg' },
  { name: '尼古拉斯', desc: 'push了最新代码', date: '3天前', avatar: 'dynamic-avatar-3|svg' },
  { name: '凯琪', desc: '开启了人生的新篇章', date: '5天前', avatar: 'dynamic-avatar-3|svg' },
  { name: '掘金队', desc: '发布了新文章<a>《2024 前端趋势：全栈也许已经是必选项》</a>', date: '5天前', avatar: 'dynamic-avatar-3|svg' },
  { name: '雷布斯', desc: '发布了小米su7', date: '3月28日', avatar: 'dynamic-avatar-4|svg' },
]

export const navList: navItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
]
