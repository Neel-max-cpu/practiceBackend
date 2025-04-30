package com.week5.allOfWeek5.Controller;

import com.week5.allOfWeek5.Filter.LogginFilter;
import com.week5.allOfWeek5.Model.BodyCal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class Calculator {

    // Week 5 - 5.1 ASSIGNMENT 1
    /*
    @GetMapping("/sum/{a}/{b}")
    public String sum(@PathVariable int a, @PathVariable int b){
        int result = a+b;
        return "the sum of "+ a +" and "+b+" is: "+result;
    }

    @GetMapping("sub/{a}/{b}")
    public String sub(@PathVariable int a, @PathVariable int b){
        int result1 = a-b;
        int result2 = b-a;
        return "the sub of "+ a +" and "+b+" is: "+result1+" and also sub of "+b+" and "+a+" is: "+result2;
    }

    @GetMapping("mul/{a}/{b}")
    public String mul(@PathVariable int a, @PathVariable int b){
        int res = a*b;
        return "the mul is: "+res;
    }

    @GetMapping("div/{a}/{b}")
    public String div(@PathVariable int a, @PathVariable int b){
        int res1 = 0, res2 = 0;
        if(b!=0) res1 = a/b;
        if(a!=0) res2 = b/a;
        return "the div is :"+res1+" "+res2;
    }

    */
    // ASSIGNMENT 3-week5.1/5.2
    @GetMapping("/getCount")
    public String getCount(){
        int count = LogginFilter.requestCount.get();
        return "Total request that hit the server till now: "+count;
    }

    @PostMapping("/sum")
    public String sum(@RequestBody BodyCal bodyCal){
        int res = bodyCal.getA() + bodyCal.getB();
        return "the sum is : "+res;
    }

    @PostMapping("/sub")
    public String sub(@RequestBody BodyCal body){
        int res1 = body.getA() - body.getB();
        int res2 = body.getB() - body.getA();
        return "the sub is : "+res1+" "+res2;
    }

    @PostMapping("/mul")
    public String mul(@RequestBody BodyCal body){
        int res = body.getA() * body.getB();
        return "the mul is: "+res;
    }

    @PostMapping("/div")
    public String div(@RequestBody BodyCal body){
        int res1 =0, res2=0;
        int a = body.getA();
        int b= body.getB();
        if(b!=0) res1 = a/b;
        if(a!=0) res2 = b/a;
        return "the div is: "+res1+" "+res2;
    }
}
