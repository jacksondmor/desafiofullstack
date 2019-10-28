<template>
  <div>
    <nav class="filtros">
      <h2>Buscar na API</h2>
      <div class="row">
        <div class="col-md">
          <h5>Tag</h5>
          <input class="form-control" type="text" v-model="tag" autofocus>
        </div>
        <div class="col-md">
          <h5>Limit</h5>
          <input class="form-control" type="text" v-model="limit" v-on:keydown="numberValidation">
        </div>
        <div class="col-md">
          <h5>Score</h5>
          <input class="form-control" type="text" v-model="score" v-on:keydown="numberValidation">
        </div>
        <div class="col-md">
          <h5>Sort</h5>
          <select class="form-control" v-model="sort">
            <option>Activity</option>
            <option>Creation</option>
            <option>Votes</option>
          </select>
        </div>
      </div>
      <div class="text-right">
        <button class="btn btn-success" v-on:click="getQuestions(tag || '-', limit || '-', score || '-', sort)">Buscar</button>
      </div>
      <div class="warming">
        <h6>{{ warning }}</h6>
      </div>
    </nav>
    <AppQuestionsList v-bind:rowData="rowData"></AppQuestionsList>
    <footer class="rodape"></footer>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios/dist/axios"
import AppQuestionsList from "./AppQuestionsList"

export default {
  name: "AppFiltros",
  components: {
    AppQuestionsList
  },
  data: function() {
    return {
      tag: "", 
      limit: "", 
      score: "", 
      sort: "",
      warning: "",
      rowData:[]
    }
  },
  methods: {
    getQuestions(tag, limit, score, sort) {           
      if (tag === '-') {
        this.warning = "Campo TAG é obrigatório"
        return
      }
      
      let params = [`tag: "${tag}"`]

      if (limit != '-'){
        params.push(`limit: ${limit}`)
      }

      if (score != '-'){
        params.push(`score: ${score}`)
      }

      params.push(`sort: "${sort}"`)

      let where = params.join(',')

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

        if (this.rowData.length === 0) {
          this.warning = "Nenhum registro encontrado na busca!"
        } else {
          this.warning = ""
        }        
        /* eslint-enable no-console */
      }).catch(error => {
        if (error) {
          /* eslint-disable no-console */
          this.warning = error
          /* eslint-enable no-console */
        }
      })
    },
    numberValidation(e) {
      let charCode = e.charCode ? e.charCode : e.keyCode;
      // charCode 8 = backspace
      // charCode 9 = tab
      if (charCode != 8 && charCode != 9) {
          // charCode 48 equivale a 0
          // charCode 57 equivale a 9
          if (((charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) && charCode !== 46) {                
            this.warning = "Campo apenas numérico"
            e.preventDefault()               
          } else {            
            this.warning = "" 
          }
      }
    }
  }
}
</script>

<style>
</style>
