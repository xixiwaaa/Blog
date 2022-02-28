<template>
  <div id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索" />
    <div v-for="blog in filteredBlogs" :key="blog.index" class="single-blog">
      <router-link :to="'/blog/' + blog.id">
        <h2 v-rainbow>{{ blog.attributes.title | toUpperCase }}</h2>
      </router-link>
      <article>{{ blog.attributes.content }}</article>
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
  // name:"ShouwBlog"
  data() {
    return {
      blogs: [],
      search: "",
    };
  },
  methods: {
    getBlog() {
      const query = new AV.Query("blogData");
      query.find().then((res) => {
        this.blogs = res;
      });
    },
  },
  created() {
    const query = new AV.Query("blogData");
    query.find().then((res) => {
      this.blogs = res;
    });
  },
  computed: {
    filteredBlogs() {
      return this.blogs.filter((blog) => {
        return blog.attributes.title.match(this.search);
      });
    },
  },
  filters: {
    /* "to-uppercase":function(value){
          return value.toUpperCase();
      }, */
    toUpperCase(value) {
      return value.toUpperCase();
    },
  },
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8);
      },
    },
  },
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
h1{
  font-size: 30px;
  text-align: center;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
}
#show-blogs a {
  color: #444;
  text-decoration: none;
}
input {
  margin-top: 15px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>