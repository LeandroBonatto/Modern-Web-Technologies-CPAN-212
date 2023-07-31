$(codument).ready(function(){
    s(".delete-book").on("click", function(){
        $target = $(e.target)
        const id = $target.attr("data-id")

        $.ajax({
            type: "delete",
            url: "/book/" + "123",
            success: function(response) {
                alert("Book deleted")
                window.location.href="/"
            },
            error: function(err){
                alert(err.responseText)
            }
        })
    })
});