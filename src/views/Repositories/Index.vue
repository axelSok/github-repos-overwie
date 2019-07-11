<template>
  <div class="repositories">
    <div class="repositories__row">
      <div class="repositories__column">
        <Widget :name="widgetName">
          <div slot="widget-body" v-if="repositories.length">
            <AppTable :items="repositories"/>
          </div>
        </Widget>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import AppTable from '@/components/basic/table/AppTable'
import Widget from '@/components/Widget'

const repositoriesWidgetName = 'Repositories'

export default {
  name: 'Repositories',
  components: {
    AppTable,
    Widget
  },
  data () {
    return {
      widgetName: repositoriesWidgetName,
      repositories: []
    }
  },
  async created () {
    await this.getPageData()
  },
  methods: {
    async getRepositories () {
      try {
        let response = await api.repositories.get.query()
        return response.data
      } catch (ex) {
        return []
      }
    },
    async getRepositoryDetails (ownerName, repoName) {
      try {
        let response = await api.repositories.get.details({
          ownerName,
          repoName
        })
        return response.data
      } catch (ex) {
        return {}
      }
    },
    async getPageData () {
      let repositoriesData = await this.getRepositories()
      let data = await Promise.all(
        repositoriesData.items.map(async repo => {
          let response = await this.getRepositoryDetails(
            repo.owner.login,
            repo.name
          )
          return {
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            owner: repo.owner.login,
            stars: repo.stargazers_count,
            forks: repo.forks,
            issues: repo.open_issues_count,
            watchers: response.subscribers_count
          }
        })
      )
      this.repositories = data
    }
  }
}
</script>

<style lang="scss">
.repositories {
  position: relative;
  height: 100%;
  min-height: 100%;
  padding: 30px 25px;
  box-sizing: border-box;

  &__row {
    display: flex;
    flex-direction: row;
  }

  &__column {
    flex-direction: row;
    width: 100%;
  }
}
</style>
