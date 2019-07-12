<template>
  <div class="repositories">
    <div class="repositories__row">
      <div class="repositories__column">
        <Widget class="repositories__widget" :name="widgetName">
          <div slot="widget-body" class="repositories__widget-body">
            <Spinner v-if="isDataLoading" />
            <AppTable v-else :items="repositories" />
          </div>
          <div slot="widget-footer" class="repositories__widget-footer">
            <AppPagination
              v-if="repositories.length"
              :total-count="totalRepositoriesCount"
              :per-page-count="countPerPage"
              :current-page="currentPage"
              @change-page="onChanePage"
            />
          </div>
        </Widget>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import AppTable from '@/components/basic/table/AppTable'
import AppPagination from '@/components/basic/AppPagination'
import Spinner from '@/components/Spinner'
import Widget from '@/components/Widget'

const repositoriesWidgetName = 'Repositories'
export default {
  name: 'Repositories',
  components: {
    AppPagination,
    AppTable,
    Spinner,
    Widget
  },
  data () {
    return {
      isDataLoading: false,
      widgetName: repositoriesWidgetName,
      totalRepositoriesCount: 0,
      countPerPage: 10,
      currentPage: 1,
      repositories: []
    }
  },
  async created () {
    await this.getPageData()
  },
  methods: {
    async getRepositories (page, countPerPage) {
      try {
        let response = await api.repositories.get.query(page, countPerPage)
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
      this.isDataLoading = true
      let repositoriesData = await this.getRepositories(
        this.currentPage,
        this.countPerPage
      )
      let data = await Promise.all(
        repositoriesData.items.map(async repo => {
          let repoDetails = await this.getRepositoryDetails(
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
            watchers: repoDetails.subscribers_count
          }
        })
      )
      this.repositories = data
      this.totalRepositoriesCount = repositoriesData.total_count
      this.isDataLoading = false
    },
    onChanePage (pageNumber) {
      this.currentPage = pageNumber
      this.getPageData()
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

  &__widget-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
