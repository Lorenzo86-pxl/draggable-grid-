/*function swapItems(index1, index2) 
{
    const element1 = document.querySelector("[data-index='" + index1 + "']");
    const element2 = document.querySelector("[data-index='" + index2 + "']");
    let sibling1 = element1.previousElementSibling;
    let sibling2 = element2.previousElementSibling;
    //Sibling als Geschwisterelemnt verwendet
   
    if (!sibling1) 
    {
        const parent = element1.parentElement;
        element2.insertAdjacentElement('afterend', element1);
        parent.insertAdjacentElement('afterbegin', element2);
        //Eltern Verzeichnis

    } else if (!sibling2) 
    {
        const parent = element2.parentElement;
        element1.insertAdjacentElement('afterend', element2);
        parent.insertAdjacentElement('afterbegin', element1);

    } else 
    {   
        if (sibling1 === element2) 
        {
            element1.insertAdjacentElement('afterend', element2);
        } else if (sibling2 === element1) 
        {
            element1.insertAdjacentElement('beforebegin', element2);
        } else 
        {
            element1.insertAdjacentElement('afterend', element2);
            sibling2.insertAdjacentElement('afterend', element1);
            //Verbindung
        }
    }
}*/

/**
*
* index1 refers to the element which is dragged
* index2 refers to the element which is the drop-target
*
*/
function swapItems(index1, index2) {
    const element1 = document.querySelector(`[data-index="${index1}"]`);
    const element2 = document.querySelector(`[data-index="${index2}"]`);
    
    
    
    if (element1 != element2) {
    const draggableItemsContainer = element1.parentElement;
    
    if (!element1.nextElementSibling) {
    element2.insertAdjacentElement('beforebegin', element1);
    draggableItemsContainer.removeChild(element2);
    draggableItemsContainer.appendChild(element2);
    } else if (element1.nextElementSibling == element2) {
    draggableItemsContainer.removeChild(element1);
    element2.insertAdjacentElement('afterend', element1);
    } else {
    const next = element1.nextElementSibling;
    draggableItemsContainer.removeChild(element1);
    element2.insertAdjacentElement('beforebegin', element1);
    draggableItemsContainer.removeChild(element2);
    next.insertAdjacentElement('beforebegin', element2);
    }
    }
    
    
    
    element2.classList.remove('dragover');
    }
    
    

function initDragAndDrop() 
{
    const draggableItemsContainer = document.querySelector('ul');
    draggableItemsContainer.addEventListener('dragstart', (e) => 
    {
        e.target.classList.add('dragged');
    });
    draggableItemsContainer.addEventListener('dragend', (e) => 
    {
        e.target.classList.remove('dragged');
    });

    draggableItemsContainer.addEventListener('dragenter', (e) => 
    {
        const draggedItem = document.querySelector('.dragged');
        if (e.target.dataset.index && e.target.dataset.index !== draggedItem.dataset.index) 
        {
            e.target.classList.add('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragleave', (e) => 
    {
        if (e.target.dataset.index) 
        {
            e.target.classList.remove('dragover');
        }
    });

    draggableItemsContainer.addEventListener('dragstart', (e) => 
    {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        e.target.classList.add('dragged');
    });

    draggableItemsContainer.addEventListener('dragover', (e) => 
    {
        e.preventDefault();
    });

    draggableItemsContainer.addEventListener('drop', (e) => 
    {
        e.preventDefault();
        e.target.classList.remove('dragover');
        const index1 = e.dataTransfer.getData('text/plain');
        const index2 = e.target.dataset.index;
        // TODO: HTML-Elemente tauschen
       
        if (index1 && index2) 
        {
            swapItems(index1, index2);
        }
    });
}

function initTouch() 
{
    const draggableItems = document.getElementsByTagName('li');
    let initialX = 0;
    let initialY = 0;
    let lastX = 0;
    let lastY = 0;

    for(let i=0; i<draggableItems.length;i++){
        draggableItems[i].addEventListener('touchstart', (e) => 
        {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            e.target.classList.add('dragged');
        });

        draggableItems[i].addEventListener('touchmove', (e) => 
        {
            const x = e.touches[0].clientX - initialX;
            const y = e.touches[0].clientY - initialY;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.target.style.transform = "translate(" + x + "px, " + y + "px)";
    
            const elementList = document.elementsFromPoint(lastX, lastY);
            if(elementList.length !== 4)
            {
                if(!elementList[1].classList.contains('dragover')){
                    elementList[1].classList.add('dragover');
                }
            } else 
            {
                let list = document.getElementsByClassName('dragover');
                if(list.length > 0)
                {
                    list[0].classList.remove('dragover');
                }
            }
        });

        draggableItems[i].addEventListener('touchend', (e) => 
        {
            const elementList = document.elementsFromPoint(lastX, lastY);
            if (elementList.length > 1 && elementList[1].hasAttribute('draggable'))
            // die swapItems Funktion wurde bereits in Aufgabe 1b von Ihnen erstellt 
            {
                swapItems(e.target.dataset.index, elementList[1].dataset.index);
            }
            e.target.style.transform = "";
            e.target.classList.remove('dragged');
            elementList[1].classList.remove('dragover');
        });
    }
}

function detectMob() 
{
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => 
    {
        return navigator.userAgent.match(toMatchItem);
    });
}

if (detectMob()) 
{
    initTouch();
} else 
{
    initDragAndDrop();
}