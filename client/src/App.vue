<template>
  <div>
    <header class="cabecalho">
      <h1>StackOverflow</h1>
    </header>
    <nav class="filtros">
      <h2>Buscar na API</h2>
      <div class="row">
        <div class="col-md">
          <h5>Tag</h5>
          <input class="form-control" type="text" v-model="tag">
        </div>
        <div class="col-md">
          <h5>Limit</h5>
          <input class="form-control" type="text" v-model="limit">
        </div>
        <div class="col-md">
          <h5>Score</h5>
          <input class="form-control" type="text" v-model="score">
        </div>
        <div class="col-md">
          <h5>Sort</h5>
          {{ sort }}
          <input class="form-control" type="text" v-model="sort"> 
        </div>
      </div>
      <div class="text-right">
        <button class="btn btn-success" v-on:click="getQuestions(tag, limit, score, sort)">Buscar</button>
      </div>
    </nav>
    <main class="conteudo">
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Owner</th>
            <th>Title</th>
            <th>Views</th>
            <th>Score</th>
            <th>Created</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="index">            
            <td scope="row"> {{ item.tag }}</td>
            <td>{{ item.ownerName }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.viewCount }}</td>
            <td>{{ item.score }}</td>
            <td>{{ item.creationDate }}</td>
          </tr>
        </tbody>  
      </table>
    </main>
    <footer class="rodape"></footer>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios/dist/axios"

export default {
  name: "app",
  data: function() {
    return {
      tag: "", 
      limit: "", 
      score: "", 
      sort: "",
      rowData:[]
    }
  },
  methods: {
    getQuestions(tag, limit, score, sort) {
      const where = `tag: "${tag}", limit: "${limit}", score: "${score}", sort: "${sort}"`
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            {
              getQuestions(${where}) {
                tag
                ownerName 
                ownerProfile
                title
                viewCount
                score
                creationDate
                link
              }
            }
          `
        }
      }).then(response => {
        /* eslint-disable no-console */
        this.rowData = []
        const query = response.data
        Array.from(query.data.getQuestions).forEach(questions => this.rowData.push(questions))
        /* eslint-enable no-console */
      }).catch(error => {
        if (error) {
          /* eslint-disable no-console */
          return console.log(error)
          /* eslint-enable no-console */
        }
      })
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  display: block;
}

.cabecalho {
  background: #fff;
  color: #333;
  padding: 50px 0 10px 30px;
}

.filtros {
  background: lightgray;
  color: #333;
  padding: 30px;
  border: lightgray solid 1px;
  margin: 0 30px
}

.filtros button {
  margin-top: 15px;
  min-width: 150px;
}

.conteudo {
  background: #fff;
  color: #333;
  padding: 30px 0;
  margin: 0 30px
}

table {
  border-radius: 3px;
  background-color: #fff;
  width: 100%;
}

th {
  background-color: lightgray;
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
  border: #fff solid 1px;
}

tbody tr:hover {
  background-color: lightskyblue;
}

.rodape {
  background: #fff;
  color: #333;
  padding: 30px;
  margin: 0 30px
}

</style>
