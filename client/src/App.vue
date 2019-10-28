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
import "./content/style.css"
import AppFiltros from "./components/AppFiltros"

export default {
  name: "app",
  components: {
    AppFiltros
  }
}
</script>

<style>
</style>
