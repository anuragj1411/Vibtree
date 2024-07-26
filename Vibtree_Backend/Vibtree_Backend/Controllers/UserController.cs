using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vibtree_Backend.DBContext;
using Vibtree_Backend.Models;

namespace Vibtree_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly UserDBContext _context;

        public UsersController(UserDBContext context)
        {
            _context = context;
        }


        [Route("GetUserDetail")]
        [HttpGet]
        public IActionResult GetUserDetail()
        {
            try
            {
                var list = new List<GetUser>();
                list = _context.mstUser.
                    Where(m => m.IsActive == true).
                    OrderByDescending(m => m.UserID).
                    Select(m => new GetUser
                    {
                        UserID = m.UserID,
                        Name = m.Name,
                        Phone = m.Phone,
                        DateOfBirth = m.DateOfBirth,
                        EMail = m.EMail
                    }).ToList();
                

                var response = new
                {
                    status_code = 200,
                    message = "User data fetched successfully.",
                    data = list
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching user data.");
            }
        }


        [Route("AddUser")]
        [HttpPost]
        public IActionResult AddUser([FromBody] User userData)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var msg = ""; int status = 0;
                    
                    // Populate existing user details
                    var users = new List<User>();
                    users = _context.mstUser.
                        Where(m => m.IsActive == true).
                        OrderByDescending(m => m.UserID).
                        Select(m => new User
                        {
                            Name = m.Name,
                            Phone = m.Phone,
                            DateOfBirth = m.DateOfBirth,
                            EMail = m.EMail
                        }).ToList();

                    if (!users.Exists(u => u.EMail == userData.EMail))
                    {
                        User user = new User
                        {
                            Name = userData.Name,
                            Phone = userData.Phone,
                            DateOfBirth = userData.DateOfBirth,
                            EMail = userData.EMail,
                            Password = userData.Password,
                            IsActive = true,
                        };

                        _context.mstUser.Add(user);
                        _context.SaveChanges();

                        msg = "User added successfully.";
                        status = 200;
                    }
                    else
                    {
                        msg = "User with this Email ID already Exists.";
                        status = 402;
                    }

                    var response = new
                    {
                        status_code = status,
                        message = msg,
                        data = userData
                    };

                    if (status == 200) { return Ok(response); }
                    else { return BadRequest(response); }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "An error occurred while adding a user.");
                }
            }
            return BadRequest(ModelState);
        }




    }
}
