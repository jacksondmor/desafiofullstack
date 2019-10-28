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
.grid {
    float: left;
    vertical-align: top;
    font-family: Verdana, sans-serif;
    border: solid 1px #CCC;
    box-shadow: 0 4px 20px 0 rgba(0,0,0,0.3);
    height: 300px;
    width: 260px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding: 5px;
}

.grid img {
    width: 100%;
    max-height: 50%;
}

.grid-info {
    padding: 10px;
    height: 90px;
    overflow: hidden;
}

.grid-info h6 {
    font-size: 0.8em;
    font-weight: 100;
    margin: 0px;
}

.grid-info-sec {
    float: left;
    padding: 0 10px;
}

.grid-info-sec-tag {
    float: right;
    padding: 0 10px;
}

.info-sec {
    margin-right: 10px
}

.info-sec-tag {
    font-weight: bold;
    font-size: 1.4em;
}
</style>