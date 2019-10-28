<template>
  <div>
    <header class="cabecalho">
      <h1>StackOverflow</h1>
    </header>  
    <AppFiltros></AppFiltros>    
    <footer class="rodape"></footer>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css"
import AppFiltros from "./components/AppFiltros"

export default {
  name: "app",
  components: {
    AppFiltros
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
  padding: 0;
  margin: 0 30px
}

.conteudo-grid {
  background: #fff;
  color: #333;
  padding: 0 80px;
  margin: 0 30px;
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

.warming h6 {
  color: crimson;
  margin: 0;
}

#layout {
  margin: 10px 30px 10px 0
}

.rodape {
  background: #fff;
  color: #333;
  padding: 30px;
  margin: 0 30px
}
</style>
