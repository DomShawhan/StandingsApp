using System.Security.Cryptography;

namespace StandingsApp.Utilities
{
    public class SecurePassword
    {
        public static string GenerateSalt(int nSalt)
        {
            var saltBytes = new byte[nSalt];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetNonZeroBytes(saltBytes);
            }

            return Convert.ToBase64String(saltBytes);
        }

        public static string HashPassword(string password, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);

            using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10101, HashAlgorithmName.SHA512))
            {
                return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(45));
            }
        }
    }
}
