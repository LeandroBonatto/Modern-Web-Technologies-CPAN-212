$(document).ready(function(){
    $(".delete-book").on("click", function(e){
        $target = $(e.target);
        const id = $target.attr("data-id");
        $.ajax({
            type: "DELETE",
            url: "/book/" + id,
            success: function(response){
                alert("Deleting Book");
                window.location.href="/";
            },
            error: function(err){
                console.log(err);
            }
        })
    })
});
