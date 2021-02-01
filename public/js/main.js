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
        let userId_session = $('#userId_session').val();
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
                    ${data.post.title}
                </h1>
                <h2 id="subtitulo">
                    ${data.post.body}
                </h2>
                <p><a href="/api/users/${data.user.id}">${data.user.name}</a></p>
                <img src="/images/${data.user.image}" alt="" srcset="" class="imgPrincipal">
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

    $('.btnAddFriend').on('click',function(e){
        
        e.preventDefault();
        $(this).addClass('disabled');
    });

    $('.btnDeletePost').on('click',function(e){
        e.preventDefault();
        let postId = $(this).val();
        let userId_session = $('#userId_session').val();
        
        $.ajax({
            url:'/api/users/delete/',
            method:'delete',
            data:{postId: postId},
            dataType:'json',
            success: function(data){
                $('#noticias').empty();

                data.posts.forEach(post => {
                    let html = `
                    <div class="noticia">
                    <div class="contenido">
                        <h1 id="titulo">
                            ${post.title}
                            <input type="hidden" name="" id="postId" >`;
                            if(userId_session == post.autor.id){
                             html += ` <button class="btn btn-danger btnDeletePost" value="${post.id}"><i class="fas fa-times-circle"></i></button>`;
                            }
                            
                         html +=`
                        </h1>
                        <h2 id="subtitulo">
                            ${post.body}
                        </h2>
                        <p>
                            <a href='/api/users/${post.autorId}'>
                                ${post.autor.name}
                            </a>
                        </p>
                        <img src="/images/${post.autor.image}" alt="" class="avatar">
                        <img src="" alt="" srcset="" class="imgPrincipal">
                        <div id="likes">
                            <i class="fas fa-heart black"></i>
                            <i class="fas fa-share black"></i>
                        </div>
                        <div id="comments">`;
                        for(var h=0; h < post.posteos.length; h++){
                            html += `<p>${post.posteos[h].autorId} - ${post.posteos[h].description}</p>`;
                        }
                        html += `</div>
                    </div>
                </div>
                    `
                    $('#noticias').append(html);
                });
            }
        })
    });

    $('.addComent').on('click',function(){
        let comment = $(this).find('input').val();
        let postId = $(this).find('button').val();
        let divComments = $(this).find('div');
        if(comment == ''){
            return false;
        }else{
            $.ajax({
                url:'/api/comments/add',
                method:'post',
                data:{comment: comment, postId: postId},
                dataType:'json',
                success: function(data){
                 divComments.append(`
                 <p>${data.comment.description}</p>
                 `)
                } 
             });
        }
        
        
        
    })

})