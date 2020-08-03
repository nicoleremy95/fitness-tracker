$(".workout").click(function(){
    location.href="/create_workout"
})
$(".exercise").click(function(){
    location.href="/create_exercise"
})

$(".add-workout-form").click(function(){
    event.preventDefault();
    const workoutObj = {
        name: $("#workout-name").val()
    }
    $.ajax({
        url:"/submit_workout",
        method:"POST",
        data: workoutObj
    }).then(exercisedb=>{
        console.log(exercisedb)
        location.href= "/";
    }).fail(err=>{
        console.log(err)
        location.reload();
    })
    console.log("clicked submit workout")
    
})

$(".add-exercise-form").click(function(){
    event.preventDefault();
    const workoutId = $(this).attr("data-id")
    const exerciseObj = {
        name: $("#exercise-name").val(),
        type: $("#exercise-type").val(),
        weight: $("#exercise-weight").val(),
        sets: $("#exercise-sets").val(),
        reps: $("#exercise-reps").val(),
        duration: $("#exercise-duration").val(),


    }
    $.ajax({
        url:"/submit_exercise",
        method:"POST",
        data: exerciseObj
    }).then(exercisedb=>{
        console.log(exercisedb)
        location.href = "/";
        
    }).fail(err=>{
        console.log(err)
        location.reload();
    })
    console.log("clicked submit exercise")
    
})