const socket = io();

document.addEventListener("DOMContentLoaded", () =>{
    const homeForm = document.querySelector("#home");
    const app1Form = document.querySelector("#app1");

    document.querySelector("#linkApp1").addEventListener("click", e =>{
        e.preventDefault();
        homeForm.classList.add("db--hidden");
        app1Form.classList.remove("db--hidden");
    });

    document.querySelector("#linkHome").addEventListener("click", e =>{
        e.preventDefault();
        homeForm.classList.remove("db--hidden");
        app1Form.classList.add("db--hidden");
    });

    document.getElementById('ip').onclick = function(){
        socket.emit('pickPlace', {value: "010 0"});
    }

    document.getElementById('pp').onclick = function(){
        socket.emit('pickPlace', {value: "010 1"});
    }

    const x_slider = document.querySelector(".in--x");
    const x_value = document.querySelector(".value--x");
    x_value.textContent = x_slider.value;
    x_slider.oninput = function(){
        x_value.textContent = this.value;
        socket.emit('analogx',{value: `020 ${this.value}`});
    }
    
    const y_slider = document.querySelector(".in--y");
    const y_value = document.querySelector(".value--y");
    y_value.textContent = y_slider.value;
    y_slider.oninput = function(){
        y_value.textContent = this.value;
        socket.emit('analogy',{value: `030 ${this.value}`});
    }

});