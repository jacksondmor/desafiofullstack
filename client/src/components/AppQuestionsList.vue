<template>
  <div>
    <main class="conteudo">
      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Owner</th>
            <th>Title</th>
            <th>Views</th>
            <th>Score</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="(item, index) in rowData" :key="index">            
            <td scope="row"> {{ item.tag }}</td>
            <td>{{ item.ownerName }}</td>
            <td ><a v-bind:href="item.link" target="_blank">{{ item.title }}</a></td>
            <td>{{ item.viewCount }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>  
      </table>
    </main>
  </div>
</template>

<script>
export default {
  name: "AppQuestionsList",
  props: ["rowData"]
};
</script>

<style scoped>
</style>