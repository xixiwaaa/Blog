<template>
  <div id="single-blog">
    <form v-if="!deleted">
      <h1>{{ blog.title }}</h1>
      <article>{{ blog.content }}</article>
      <p>作者:{{ blog.author }}</p>
      <p>分类:</p>
      <ul>
        <li v-for="category in blog.categories" :key="category.index">
          {{ category }}
        </li>
      </ul>
      <button @click="deleteSingleBlog()">删除</button>
      <router-link :to="'/edit/' + id" tag="button">编辑</router-link>
    </form>
    <div v-if="deleted">
      <h3>您的博客已删除!</h3>
    </div>
  </div>
</template>

<script>
const AV = require("leancloud-storage");
const { Query, User } = AV;
AV.init({
  appId: "rfrdDPIl52fqOLog66rrY83d-gzGzoHsz",
  appKey: "HcECHHihOFojnfbvc02T35qY",
  serverURL: "https://rfrddpil.lc-cn-n1-shared.com",
});
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      deleted: false,
    };
  },
  created() {
    const query = new AV.Query("blogData");
    query.equalTo("objectId", this.id);
    query.find().then((res) => {
      this.blog = res[0].attributes;
    });
  },
  methods: {
    deleteSingleBlog() {
      const blog = AV.Object.createWithoutData("blogData", this.id);
      blog.destroy();
      this.deleted = true;
    },
  },
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
h1,
article,
p,
ul {
  margin: 10px;
}
h1 {
  font-size: 20px;
  font-weight: bold;
}
button {
  margin-top: 10px;
  margin-left: 10px;
}
</style>