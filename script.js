const accordion = document.querySelectorAll('.accordion')
console.log(accordion.length);


for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function(e){
        // We use this. isntead of e.target.value as if we click on the icon it has no sibling so the e.target.value will return null and the accordion won't work,
        // So instead we are using this. to make sure it is targetting the acccordion itslef
        // So intead of the event this function is always called by the accordion itself this referes to the accordion which called it
        this.classList.toggle("active-accordion");
        const accordionData = this.nextElementSibling;
            if (accordionData.style.maxHeight) {
                accordionData.style.maxHeight = null;
            } else {
                accordionData.style.maxHeight = accordionData.scrollHeight + "px";
            }
        
    });
}