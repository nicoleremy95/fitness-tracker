$(".add-exercise-form").click(function(){
    event.preventDefault();
    const exerciseObj = {
        name: $("#exercise-name").val(),
        type: $("#exercise-type").val(),
        weight: $("#exercise-weight").val(),
        sets: $("#exercise-sets").val(),
        reps: $("#exercise-reps").val(),
        duration: $("#exercise-duration").val(),

    }
    $.ajax({
        url:"/submit",
        method:"POST",
        data: exerciseObj
    }).then(exercisedb=>{
        console.log(exercisedb)
        location.reload();
    }).fail(err=>{
        console.log(err)
        location.reload();
    })
    console.log("clicked submit exercise")
})