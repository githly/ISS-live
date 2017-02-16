const panelTransform = function(e)
{
    e.target.parentNode.classList.toggle("hidden");
}
const panelTransformReady = function()
{
    document.getElementById("topleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("topright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomleft").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottomright").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("top").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("bottom").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("left").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
    document.getElementById("right").getElementsByClassName("transformButton")[0].addEventListener("click", panelTransform);
}
document.addEventListener("DOMContentLoaded", function()
        {
            panelTransformReady();
        });
