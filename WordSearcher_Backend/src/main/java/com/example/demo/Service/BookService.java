package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Book;
import com.example.demo.Repo.BookRepository;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	public Book createBook(Book book) {
		return bookRepository.save(book);
	}

	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	 public Book getBookByName(String name) {
	        return bookRepository.findByBookName(name)
	                .orElseThrow(() -> new RuntimeException("Book not found: " + name));
	    }
	 
	public Book getBookById(Long id) {
		return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found!"));
	}
}
