$(document).ready(function(){
    $('.fa-heart').on('click',function(){
        if($(this).hasClass('black')){
            $(this).removeClass('black');
            $(this).addClass('red');
        }else{
            $(this).removeClass('red');
            $(this).addClass('black');
        }
        
    });

    $('#btnPost').on('click',function(){
        let title = $('#title').val();
        let body = $('#body').val();
        let userId = $('#userId').val();

        let params = {title: title, body: body, userId: userId}

        $.ajax({
            method:'post',
            url:'/api/posts/add',
            dataType:'json',
            data:params,
            success:function(data){
                $('#noticias').prepend(` 
                <div class="noticia">
                <div class="contenido">
                <h1 id="titulo">
                    ${data.title}
                </h1>
                <h2 id="subtitulo">
                    ${data.body}
                </h2>
                <p>${data.name}</p>
                <img src="" alt="" srcset="" class="imgPrincipal">
                <div id="likes">
                    <i class="fas fa-heart black"></i>
                    <i class="fas fa-share black"></i>
                </div>
            </div>
            </div>
                `)
            }
        })
    });

    $('#btnAddFriend').on('click',function(){
        
    });

})