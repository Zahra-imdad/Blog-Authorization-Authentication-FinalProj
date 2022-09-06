class AddBlog{
    constructor(){
        this.titleTextArea = document.getElementById("titleAdd")
        this.contentTextArea = document.getElementById("contentAdd")
        this.addBlogBtn = document.getElementById("addBlogBtn")
        this.clickEventAdd()
    }

    clickEventAdd(){
      this.addBlogBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        this.addBlogs();
      })
    }
    
    
    addBlogs(){
      const typedTitleTextArea = this.titleTextArea.value.trim();
      const typedContentTextArea = this.contentTextArea.value.trim();
      if(typedTitleTextArea ==''){
        alert("Title Required")
      }else{
        const userId = localStorage.getItem('uid')
        console.log(userId);
        fetch("http://localhost:3000/blog/add_blog", {
        method: "POST",
        body: JSON.stringify({ title: typedTitleTextArea ,content: typedContentTextArea ,authorDetail: userId}),
        headers: { "Content-type": "application/json; charset=UTF-8"},
      })
      alert("Blog Added Successfully")
        
      }
    }
}

const addBlog = new AddBlog();