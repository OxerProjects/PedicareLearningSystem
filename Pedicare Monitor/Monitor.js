let showBarPositon = 0
let leftside = 5
setInterval(() => {
    const showBar = document.getElementById("show")
    if (showBarPositon < 1000) {
        showBarPositon++
        leftside += 5
        showBar.style.left = `${leftside}px`;   
        console.log(leftside);     
    }
    else {
        clearInterval()
        showBar.style.backgroundColor = '#ffffff'
    }
}, 1);


i = 0
let c = 0
let currentDot = document.getElementById("firstDot")

function update() {
    setTimeout(function() {
        const dot = document.createElement("span")
        dot.className = "dot"
        dot.style.marginBottom = `${c}px`
        dot.id = `dot${i}`

        if (i > 1000 && i < 1100) {
            c = c + 1
        }
        if (i > 1100 && i < 1300) {
            c = c - 1
        }
        if (i > 1300 && i < 1400) {
            c = c + 1
        }

        if (i > 2000 && i < 2100) {
            c = c + 1
        }
        if (i > 2100 && i < 2300) {
            c = c - 1
        }
        if (i > 2300 && i < 2400) {
            c = c + 1
        }

        if (i > 3000 && i < 3100) {
            c = c + 1
        }
        if (i > 3100 && i < 3300) {
            c = c - 1
        }
        if (i > 3300 && i < 3400) {
            c = c + 1
        }


        document.body.appendChild(dot)   
        currentDot.after(dot)
        currentDot = document.getElementById(`${dot.id}`)

        i++
        if (i < 12000) {
            update()
        }

        //if (i >= 11999) {
        //    const element = document.querySelectorAll(".dot");
        //    element.remove();
        //    console.log("cant delete")
        //    console.log(i)
        //}    
    })
}

update()