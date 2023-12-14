
using System.Data;

namespace backend.tests.Controllers
{
    public class PayControllerTest : BaseTestController
    {
     
        public PayControllerTest()
        {
        }

        [Fact]
        public void BasePayTestNoTax() //good good
        {
            //Add shifts to db with no rules
            //set Taxrate to 0
            PurgeDB();
            var userController = new UserController(_context);
            var user = MockUser();
            user.Taxrate = 0;

            var uid = userController.RegisterUser(user);

            var jobController = new JobController(_context);
            var job = MockJob(); //175kr/h
            job.UiD = uid;

            jobController.PostJob(job);
            
            var shiftsController = new ShiftController(_context);
            var shift = MockShift();

            shift.uiD = uid;
            
            shiftsController.PostShift(shift);


            var payController = new PayController(_context);

            var pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(350, pay); //2 hours * 175kr/h

            PurgeDB();
        }

        [Fact]
        public void BasePayTestWithTax()
        {
             //Add shifts to db with no rules
            //set Taxrate to 0
            PurgeDB();
            var userController = new UserController(_context);
            var user = MockUser();
            user.Taxrate = 25; //25 tax 

            var uid = userController.RegisterUser(user);

            var jobController = new JobController(_context);
            var job = MockJob(); //175kr/h
            job.UiD = uid;

            jobController.PostJob(job);
            
            var shiftsController = new ShiftController(_context);
            var shift = MockShift();

            shift.uiD = uid;
            
            shiftsController.PostShift(shift);


            var payController = new PayController(_context);

            var pay = payController.ExpectedPay(uid, 20231201, 20231230);

            Assert.Equal(262.5, pay); //2 hours * 175kr/h

        }

        [Fact]
        public void BaseWithTaxAndMultipleShifts()
        {

        }

        [Fact]
        public void BaseWithTaxAndMultipleShiftsAndJobs()
        {
            
        }

        [Fact]
        public void BasePayTestWithNoRules()
        {
            //Add shifts to db with rules
            //set Taxrate to 0

        }

        [Fact]
        public void BasePayTestWithRules()
        {
            //Add shifts to db with rules
            //set Taxrate to 25

        }

    }
}