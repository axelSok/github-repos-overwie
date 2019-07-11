<template>
  <div class="hello">
    <div class="vuestic-widget">
      <div class="vuestic-widget-header">Basic Table</div>
      <div class="vuestic-widget-body">
        <div class="table-responsive" v-if="repositories.length">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Name</td>
                <td>Link</td>
                <td>Owner</td>
                <td>Stars</td>
                <td>Forks</td>
                <td>Issues</td>
                <td>Watchers</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="repository in repositories" :key="repository.id">
                <td>{{ repository.name }}</td>
                <td>{{ repository.url }}</td>
                <td>{{ repository.owner }}</td>
                <td>{{ repository.stars }}</td>
                <td>{{ repository.forks }}</td>
                <td>{{ repository.openIssues }}</td>
                <td>{{ repository.watchers }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Repositories',
  data () {
    return {
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
        let response = await api.repositories.get.details({ ownerName, repoName })
        return response.data
      } catch (ex) {
        return {}
      }
    },
    async getPageData () {
      let data = []
      let repos = await this.getRepositories()
      for (let repo of repos.items) {
        let response = await this.getRepositoryDetails(repo.owner.login, repo.name)
        data.push({
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          owner: repo.owner.login,
          stars: repo.stargazers_count,
          forks: repo.forks,
          openIssues: repo.open_issues_count,
          watchers: response.subscribers_count
        })
      }
      this.repositories = data
      // return await Promise.all(
      //   repos.map(async repo => {
      //     let ownerName = repo.owner.login
      //     let repoName = repo.name
      //     let response = await Promise.all([
      //       this.getRepositoryIssues(ownerName, repoName),
      //       this.getRepositoryForks(ownerName, repoName),
      //       this.getRepositorySubscribers(ownerName, repoName)
      //     ])
      //     console.log(response)
      //     return {
      //       name: repo.name,
      //       url: repo.url,
      //       owner: repo.owner.login
      //     }
      //   })
      // )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
