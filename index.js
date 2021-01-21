//ES6 Class
class TypeWriter{
    constructor(txtElement, words, wait=3000){
        this.txtElement=txtElement;
        this.words=words;
        this.txt='';
        this.wordindex =0;
        this.wait = parseInt(wait,10);
        this.type();
        this.isDeleting=false;
}
type(){
      //current index of word
      const current =this.wordindex % this.words.length;
      // get full text of current word
      const fulltxt= this.words[current];
  
      //check if deleting
      if(this.isDeleting){
          //remove char
          this.txt = fulltxt.substring(0, this.txt.length-1)
  
      }
      else{
          //add char
          this.txt = fulltxt.substring(0, this.txt.length+1)
      }
  
      // insert text into element
      this.txtElement.innerHTML=`<h2 class="txt">${this.txt}</h2>`
     
      //type speed
      let typeSpeed= 300;
      if(this.isDeleting){
          typeSpeed/=2;
      }
  
      //if word is complete
      if(!this.isDeleting && this.txt === fulltxt){
          //make pause at end
          typeSpeed= this.wait;
  
          //set delete to true
          this.isDeleting=true;
      } else if (this.isDeleting && this.txt===''){
          this.isDeleting=false;
  
          //move to next word
          this.wordindex++;
          //pause before start typing
          typeSpeed=500;
      }
      setTimeout(() => this.type(), typeSpeed)
  }
}

//init in DOM Lead
document.addEventListener('DOMContentLoaded', init);

// init app
function init(){
    const txtElement=document.querySelector('.txt-type');
    const words= JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

// init typewriter
new TypeWriter(txtElement, words, wait);
}
