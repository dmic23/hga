from django.conf.urls import include, patterns, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework import routers
from student_portal.views import IndexView
from users.views import UserViewSet, StudentGoalsViewSet, StudentPracticeLogViewSet, StudentObjectiveViewSet, StudentWishListViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'student-goals', StudentGoalsViewSet)
router.register(r'student-practice-logs', StudentPracticeLogViewSet)
router.register(r'student-objectives', StudentObjectiveViewSet)
router.register(r'student-wish-list', StudentWishListViewSet)

urlpatterns = [
	url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),

    url(r'^$',  IndexView.as_view(), name='index'),    
    url(r'^/$',  IndexView.as_view(), name='index'),
]
