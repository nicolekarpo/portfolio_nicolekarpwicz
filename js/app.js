import { cdnUrl, projectID } from './env.js';
import { handleImage, handleParagraphs } from './utils.js';

function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')


    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('mobile-nav-hide');
        burgerIcon.classList.toggle('burger');
        burgerIcon.classList.toggle('closemobilemenu');
    });

    if(pageValue === null) {
        getPosts(); 
    } else {
        getPost(pageValue);
    }
}


async function getPost(pageValue) {
    const project = document.querySelector('.project');
    const post = await fetch(`https://06l51xgj.api.sanity.io/v1/data/query/production?query=*)
    [slug.current == "${pageValue}"]
    `);
    const { result } = await post.json();
   
    project.append(handleImage(result[0].mainImage.asset._ref));
    const title = document.createElement('h1');
    title.innerText = result[0].title;
    project.append(title)
    project.append(handleParagraphs(result[0].body));
}


async function getPosts() {
    
    const posts =  await fetch(`https://06l51xgj.api.sanity.io/v1/data/query/production?query=*`);
    [_type == 'post']
   
    const { result } = await posts.json();

    console.log(result)
   
    

    
    const worksList = document.querySelector('.workslist');

    const cdnUrl  = 'https://cdn.sanity.io/images/06l51xgj/production/';

    
    result.forEach(post => {
  
      
       
        const workBlock = document.createElement('a'); 
        workBlock.classList.add('work'); 
        workBlock.setAttribute(
            'href', 
            `./work.html?page=${post.slug.current}`
        ); 
        
        
        const workTitle = document.createElement('h2'); 
        workTitle.classList.add('work-title'); 
        workTitle.innerText = post.title; 
        workBlock.append(workTitle); 
        const workMask = document.createElement('div'); 
        workMask.classList.add('work-mask'); 
        workBlock.append(workMask); 

        const workCover = document.createElement('img'); 
       
        const cover = post.mainImage.asset._ref.split('-'); 
       
        workCover.classList.add('work-cover');
        workCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);

 workBlock.append(handleImage(post.mainImage.asset._ref, 'work-cover'));
         worksList.append(workBlock); 
    });

}

init();
