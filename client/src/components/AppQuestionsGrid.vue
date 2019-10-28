<template>
  <div>
    <main class="conteudo-grid">
        <div class="grid" v-for="(item, index) in rowData" :key="index">
            <img v-bind:src="item.ownerProfile"/>  
            <div class="grid-info" scope="row">                
                <h5> {{ item.ownerName }} </h5>
                <h6> <a v-bind:href="item.link" target="_blank">{{ item.title }}</a></h6>                
            </div> 
            <div class="grid-info-sec">
                <span class="info-sec">Score: {{ item.score }} </span>
                <span class="info-sec">Views: {{ item.viewCount }}</span>  
            </div>                                
            <div class="grid-info-sec-tag">                            
                <span class="info-sec-tag ">{{ item.tag }}</span>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AppQuestionsGrid",
  props: ["rowData"]
};
</script>

<style scoped>
</style>