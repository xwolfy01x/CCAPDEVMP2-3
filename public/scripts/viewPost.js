let userCount = 100;
let dateCreated = new Date();
$(document).ready(function() {
    $('#fco').submit(e => {
        e.preventDefault();
    })
    $('#postComment').click(function() {
        if ($('#postCommentBox').val()!='') {
            $.ajax({
                url: 'https://o-fit.herokuapp.com/postComment',
                method: 'POST',
                data: {
                    postId: $('#pId').val(),
                    comment: $('#postCommentBox').val()
                },
                success: function(data) {
                    document.getElementById('temp').insertAdjacentHTML('afterbegin', `
                        <div>
                            <span class="dateCreated">${dateCreated.toISOString().slice(0,10)}</span>
                            <br>
                            <span class="userCommentor"></span>
                            <button>
                                <img class="ebtn" id="#edit" src="/images/editButton.png", onclick='
                                    $("#editCommentBox").text("${data.comment.review}");
                                    $("#editComment${userCount}").css("display", "inline-block");
                                    $("#cancelComment${userCount}").css("display", "inline-block");
                                    $("#editcommentID").val("${data.comment._id}");
                                    document.getElementById("comment${userCount}").contentEditable=true;'>
                            </button>
                            <button>
                                <form action="/deleteComment", method="POST">
                                    <button type="button" class="deleteComment"><img class="ebtn" id="delete" src="/images/deleteButton.png"></button>
                                    <input type="text" value="${$('#pId').val()}" name="postId" style="display: none;">
                                    <input id="editcommentID" type="text" value="${data.comment._id}" name="commentId" style="display: none;">
                                </form>
                            </button>
                        </div>
                        <form id="editForm${userCount}" action="/editComment", name="editForm${userCount}", method="POST" style="width: 100%;">
                            <blockquote id="comment${userCount}" style="overflow-wrap: break-word; word-break: break-all;"></blockquote>
                            <button class="cancelComment" id="cancelComment${userCount}", type="button", onclick="
                                $('#editComment${userCount}').css('display', 'none');
                                $('#cancelComment${userCount}').css('display', 'none');
                                document.getElementById('comment${userCount}').contentEditable=false;
                            "> Cancel
                            </button>
                            <button class="editComment" id="editComment${userCount}" type="button" onclick="
                                $('#hiddenComment${userCount}').val($('#comment${userCount}').html());
                            "> Save
                            </button>
                            <input id="#editcommentID" type="text" value="${data.comment._id}" name="commentId" style="display: none;">
                            <input type="text" value="${$('#pId').val()}" name="postId" style="display: none;">
                            <input id="hiddenComment${userCount}" type="text" name="comment" style="display: none;">
                        </form>
                    `);
                    document.getElementsByClassName('userCommentor')[0].innerText = data.user.fname + ' ' + data.user.lname + ' says...';
                    document.getElementById(`comment${userCount}`).innerText = data.comment.review;
                    userCount++;
                }
            })
        }
        $('#postCommentBox').val('');
    })
    $("body").delegate('.editComment','click', function() {
        $(this).prev().prev().attr('contenteditable', false);
        $(this).css('display', 'none');
        $(this).prev().css('display', 'none');
        $.ajax({
            url: 'https://o-fit.herokuapp.com/editComment',
            method: 'POST',
            data: {
                commentId: $(this).next().val(),
                comment: $(this).next().next().next().val()
            },
            success: function() {
                console.log('success');
            }
        });
    })
    $("body").delegate('.deleteComment', 'click', function() {
        $.ajax({
            url: 'https://o-fit.herokuapp.com/deleteComment',
            method: 'POST',
            data: {
                commentId: $(this).next().next().val()
            },
            success: function() {
                console.log('deleted!')
            }
        });
        $(this).parent().next().remove();
        $(this).parent().remove();
    })
    $('.like').click(function() {
        console.log($(this).prev().val())
        $.ajax({
            url: 'https://o-fit.herokuapp.com/post/likePost',
            method: 'POST',
            data: {
                postId: $(this).prev().val()
            },
            success: function() {
                console.log('Likes Updated!');
            }
        })
        if ($(this).children().attr('src') === '/images/LikeAfter.png')
            $(this).children().attr('src', '/images/LikeBefore.png');
        else $(this).children().attr('src', '/images/LikeAfter.png');
    })
})