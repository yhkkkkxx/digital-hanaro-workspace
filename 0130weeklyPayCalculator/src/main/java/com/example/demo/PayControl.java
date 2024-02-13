package com.example.demo;

import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "")
public class PayControl {
	@GetMapping("/payment")
	public HashMap<String, String> payment() {
		HashMap<String, String> map = new HashMap<String, String>();
		
		map.put("name", "hong");
		map.put("wt", "20");
		map.put("pph", "20000");
		return map;
	}

	@PostMapping("/payment")
	public HashMap<String, Object> add3(HttpServletRequest request, 
			@RequestParam("name") String name, 
			@RequestParam("wt") int wt,
			@RequestParam("pph") int pph) {

		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("wt", wt);
		map.put("pph", pph);
		map.put("result", wt*pph);
		return map;
	}

}
