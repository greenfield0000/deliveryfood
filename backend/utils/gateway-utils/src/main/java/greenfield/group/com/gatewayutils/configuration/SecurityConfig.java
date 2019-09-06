package greenfield.group.com.gatewayutils.configuration;

import greenfield.group.com.gatewayutils.filters.CustomCsrfAndCorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;

@EnableWebSecurity(debug = true)
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private CustomCsrfAndCorsFilter csrfAndCorsFilter;

    // регистрируем нашу реализацию UserDetailsService
    // а также PasswordEncoder для приведения пароля в формат SHA1
    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(getBCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // включаем защиту от CSRF атак
        http
                .csrf().disable()
                .cors().disable()
                // TODO пока отключено

//                .addFilterBefore(csrfAndCorsFilter, ChannelProcessingFilter.class)
//                .csrf() // csrf config starts here
//                .ignoringAntMatchers("/") // URI where CSRF check will not be applied
//                .csrfTokenRepository(csrfTokenRepository()) // defines a repository where tokens are stored
//                // указываем правила запросов
//                // по которым будет определятся доступ к ресурсам и остальным данным
//                .and()
                .authorizeRequests()
                .antMatchers("/resources/**", "/", "/auth/login", "/auth/registry").permitAll()
                .anyRequest().permitAll()
                .and();

        http.formLogin()
                .disable();

        http.logout()
                .disable();
    }

    private CsrfTokenRepository csrfTokenRepository() {
        CookieCsrfTokenRepository repository = new CookieCsrfTokenRepository();
        repository.setCookieName(csrfAndCorsFilter.CSRF_COOKIE_NAME);
        repository.setCookieHttpOnly(false);
        return repository;
    }

    // Указываем Spring контейнеру, что надо инициализировать ShaPasswordEncoder
    // Это можно вынести в WebAppConfig, но для понимаемости оставил тут
    @Bean
    public PasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
