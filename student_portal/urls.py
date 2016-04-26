from django.conf.urls import include, patterns, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from student_portal.views import IndexView
from users.views import UserViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
	url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),

    url(r'^$',  IndexView.as_view(), name='index'),    
    url(r'^/$',  IndexView.as_view(), name='index'),
]
