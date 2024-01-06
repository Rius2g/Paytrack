namespace backend.tests.Controllers
{
    public class UserControllerTest : BaseTestController
    {
        [Fact]
        public void RegisterAndLoginUser()
        {
            PurgeDB();
            var userController = new UserController(_context);
            var user = MockUser();

            user.Email = "mmo182@uit.no";
            user.Password = "test123";
            var uid = userController.RegisterUser(user);

            var login = userController.loginUser(user);
            Assert.Equal(uid, login.ID);

        }
    }
}
