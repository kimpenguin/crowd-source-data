<template>

  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">{{ title }}</h1>
        <input v-model="search" type="text" class="input">

        <div class="columns" v-for="resource in filtered">
          <div class="column" >
            <p class="title">{{ resource["gsx$link"].$t }}</p>
            <p class="subtitle">{{ resource["gsx$summary"].$t }}</p>
            <p>{{ resource["gsx$category"].$t }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Resources',
      search: '',
      resources: []
    };
  },
  created() {
      var apiURL = "https://spreadsheets.google.com/feeds/list/1U-vbz5Owv9Nv57Et8U3F0gHvrKZaz51-jRuvg1f_GmM/o9uqfni/public/values?alt=json";
      fetch(apiURL)
        .then(res => res.json())
        .then(res => (this.resources = res.feed.entry))
        .catch(error => console.log(error));
    },
    computed: {
    filtered() {
      return this.resources.filter(resource => {
        return resource.content.$t.toLowerCase().includes(this.search.toLowerCase())
      })
    }
    }
};
</script>

<style>
</style>