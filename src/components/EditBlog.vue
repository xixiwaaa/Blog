<template>
  <div id="add_blog">
    <h2>添加博客</h2>
    <form v-if="!submited">
      <label> 博客标题 </label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>Angular</label>
        <input type="checkbox" value="Angular" v-model="blog.categories" />
      </div>
      <label>作者:</label>
      <input type="text" v-model="blog.author" />
      <button @click.prevent="post">提交</button>
    </form>
    <div v-if="submited">
      <h3>您的博客发布成功!</h3>
    </div>
    <hr />
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{ blog.title }}</p>
      <p>博客内容:</p>
      <p>{{ blog.content }}</p>
      <p>博客分类:</p>
      <ul>
        <li v-for="category in blog.categories" :key="category.index">
          {{ category }}
        </li>
      </ul>
      <p>作者:{{ blog.author }}</p>
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
  name: "AddBlog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {
        title: "",
        content: "",
        categories: [],
        author: "",
      },
      submited: false,
    };
  },
  methods: {
    post() {
      const B = AV.Object.extend("blogData");
      const blog = new B();
      blog.save({
        title: this.blog.title,
        content: this.blog.content,
        categories: this.blog.categories,
        author: this.blog.author,
      });
      this.submited = true;
    },
  },
  created() {
    const query = new AV.Query("blogData");
    query.equalTo("objectId", this.id);
    query.find().then((res) => {
      this.blog = res[0].attributes;
    });
    console.log(this.blog);
  },
};
</script>

<style scoped>
#add_blog * {
  box-sizing: border-box;
}
#add_blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input,
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 200px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
  vertical-align: middle;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
  width: 20px;
}
button {
  display: block;
  margin: 20px auto;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
</style>