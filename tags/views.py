from django.shortcuts import redirect, render
from tags.models import Tag
from blogPosts.models import Post

class TagView:
    def create(request):
        Tag.objects.create(content=request.POST['content'])
        return redirect('blogPosts:index')

    def read(request, id):
        tag = Tag.objects.get(id=id)
        posts = Post.objects.filter(tags=tag)
        return render(request, 'tags/detail.html', {'tag': tag, 'posts': posts})
        
    def update(request, id):
        tag = Tag.objects.get(id=id)
        tag.content = request.POST['content']
        tag.save()
        return render(request, 'tags/detail.html', {'tag': tag})
        
    def delete(request, id):
        Tag.objects.get(id=id).delete()
        return redirect('blogPosts:index')
