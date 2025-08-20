using Microsoft.AspNetCore.Mvc;
using Server.Interfaces;
using TaskManagerAPI.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthServices _authServices;
    private readonly TokenService _tokenService;

    public AuthController(IAuthServices authServices, TokenService tokenService)
    {
        _authServices = authServices;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var user = await _authServices.AuthenticateAsync(loginRequest.Email, loginRequest.Password);

        if (user == null)
            return Unauthorized("Invalid credentials");

        var token = _tokenService.GenerateToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                user.Id,
                user.Name,
                user.Email,
                user.Role
            }
        });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
}
