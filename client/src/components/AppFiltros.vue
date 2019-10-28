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
    <div id="layout" class="text-right">
      <div class="btn-group" role="group" aria-label="Exemplo básico">
        <div v-if="visible">
          <button type="button" class="btn btn-light btn-sm" v-on:click="changeLayout()"><img src="../assets/grid.png"></button> 
        </div>
        <div v-else>
          <button type="button" class="btn btn-light btn-sm"  v-on:click="changeLayout()"><img src="../assets/lista.png"></button>
        </div>          
      </div>
    </div>
    <div v-if="visible">
      <AppQuestionsList v-bind:rowData="rowData"></AppQuestionsList>
    </div>
    <div v-else>
      <AppQuestionsGrid v-bind:rowData="rowData"></AppQuestionsGrid>
    </div>    
    <footer class="rodape"></footer>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios/dist/axios"
import AppQuestionsList from "./AppQuestionsList"
import AppQuestionsGrid from "./AppQuestionsGrid"

export default {
  name: "AppFiltros",
  components: {
    AppQuestionsList,
    AppQuestionsGrid
  },
  data: function() {
    return {
      tag: "", 
      limit: "", 
      score: "", 
      sort: "",
      warning: "",
      visible: true,
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
    },
    changeLayout() {
      this.visible = !this.visible
    }
  }
}
</script>

<style>
</style>
