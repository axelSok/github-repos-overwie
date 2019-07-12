<template>
  <div class="repositories">
    <div class="repositories__row">
      <div class="repositories__column">
        <Widget class="repositories__widget" :name="widgetName">
          <div slot="widget-body" class="repositories__widget-body">
            <Spinner v-if="isDataLoading" />
            <AppTable v-else
              :sort-field="sortField"
              :sort-by-ascending="sortByAscending"
              :data="repositories"
              :data-header="gridHeaderData"
              @sorting-change="onSortingChange"/>
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
import AppTable from '@/components/basic/AppTable'
import AppPagination from '@/components/basic/AppPagination'
import Spinner from '@/components/Spinner'
import Widget from '@/components/Widget'

const repositoriesWidgetName = 'Repositories'

const cellTypeEnums = {
  string: 1,
  number: 2,
  link: 3
}

const getCellHeaderData = (propertyName, value) => {
  switch (propertyName) {
    case 'name':
      return {
        key: propertyName,
        cellOrder: 1,
        type: cellTypeEnums.string
      }
    case 'url':
      return {
        key: propertyName,
        cellOrder: 2,
        type: cellTypeEnums.link
      }
    case 'owner':
      return {
        key: propertyName,
        cellOrder: 3,
        type: cellTypeEnums.string
      }
    case 'stars':
      return {
        key: propertyName,
        keyOrder: 'stars',
        cellOrder: 4,
        type: cellTypeEnums.number
      }
    case 'forks':
      return {
        key: propertyName,
        keyOrder: 'forks',
        cellOrder: 5,
        type: cellTypeEnums.number
      }
    case 'issues':
      return {
        key: propertyName,
        cellOrder: 6,
        type: cellTypeEnums.number
      }
    case 'watchers':
      return {
        key: propertyName,
        value,
        cellOrder: 7,
        type: cellTypeEnums.number
      }
    default:
      return {
        key: propertyName,
        value,
        cellOrder: -1,
        type: cellTypeEnums.string
      }
  }
}

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
      sortByAscending: false,
      sortField: 'stars',
      repositories: []
    }
  },
  async created () {
    await this.getPageData()
  },
  computed: {
    gridHeaderData () {
      if (this.repositories.length) {
        let rowHeaderData = []
        for (let key of Object.keys(this.repositories[0])) {
          rowHeaderData.push(getCellHeaderData(key, this.repositories[0][key]))
        }
        return rowHeaderData
      }
      return []
    },
    queryParam () {
      return {
        page: this.currentPage,
        countPerPage: this.countPerPage,
        sortField: this.sortField,
        sortDirection: this.sortByAscending ? 'asc' : 'desc'
      }
    }
  },
  methods: {
    async getRepositories (queryParam) {
      try {
        let response = await api.repositories.get.query(queryParam)
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
      let repositoriesData = await this.getRepositories(this.queryParam)
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
      // TODO: must be like 'repositoriesData.total_count'
      // but error from github API - Only the first 1000 search results are available
      this.totalRepositoriesCount = 1000
      this.isDataLoading = false
    },
    onChanePage (pageNumber) {
      this.currentPage = pageNumber
      this.getPageData()
    },
    onSortingChange ({ sortField, sortByAscending }) {
      this.sortField = sortField
      this.sortByAscending = sortByAscending
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

  &__widget-body {
    height: 355px;
  }

  &__widget-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
