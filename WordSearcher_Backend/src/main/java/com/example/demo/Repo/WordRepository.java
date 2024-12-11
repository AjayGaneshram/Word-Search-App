package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Dto.UniqueWordDetails;
import com.example.demo.Dto.WordBookMaraiMoozhiYouTubeDTO;
import com.example.demo.Entity.MaraiMoozhi;
//import com.example.demo.Controller.MaraiMoozhi;
import com.example.demo.Entity.Word;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

	Optional<Word> findByWordName(String wordName);

	@Query("SELECT distinct w.wordName FROM Word w")
	List<String> findAllWordNames();

	@Query("SELECT b.bookName FROM Book b")
	List<String> findAllBookNames();

	@Query("SELECT distinct m.maraiMoozhiName FROM MaraiMoozhi m")
	List<String> findAllMaraiMoozhiNames();

	@Query("SELECT w.wordName FROM Word w JOIN w.maraimoozhis m WHERE m.maraiMoozhiName = :maraiMoozhiName")
	List<String> findWordsByMaraiMoozhiName(String maraiMoozhiName);

	@Query("SELECT w.wordName FROM Word w JOIN w.books b WHERE b.bookName = :bookName")
	List<String> findWordsByBookName(String bookName);

	@Query("SELECT DISTINCT w FROM Word w " + "JOIN w.books b " + "LEFT JOIN FETCH w.maraimoozhis "
			+ "LEFT JOIN FETCH w.youTubeVideos " + "WHERE LOWER(b.bookName) = LOWER(:bookName)")
	List<Word> findWordSummaryByBookName(String bookName);

	@Query(value = "SELECT " + "w.word_name AS wordName, " + "w.word_name_description AS wordNameDescription, "
			+ "GROUP_CONCAT(DISTINCT b.book_name) AS bookNames, "
			+ "GROUP_CONCAT(DISTINCT m.marai_moozhi_name) AS maraiMoozhiNames, "
			+ "GROUP_CONCAT(DISTINCT y.you_tubetitle) AS youTubeNames " + "FROM word w "
			+ "LEFT JOIN word_book wb ON w.id = wb.word_id " + "LEFT JOIN book b ON b.id = wb.book_id "
			+ "LEFT JOIN word_maraimoozhi wm ON w.id = wm.word_id "
			+ "LEFT JOIN marai_moozhi m ON m.id = wm.maraimoozhi_id "
			+ "LEFT JOIN word_youtube wy ON w.id = wy.word_id " + "LEFT JOIN you_tube y ON y.id = wy.youtube_id "
			+ "GROUP BY w.word_name", nativeQuery = true)
	List<Object[]> findUniqueWordDetailsNative();

	@Query("SELECT DISTINCT w FROM Word w " + "JOIN w.books b " + "LEFT JOIN FETCH w.maraimoozhis m "
			+ "LEFT JOIN FETCH w.youTubeVideos " + "WHERE LOWER(m.maraiMoozhiName) = LOWER(:maraiMoozhiName)")
	List<Word> findWordSummaryByMaraiMoozhi(String maraiMoozhiName);

	@Query("SELECT new com.example.demo.Dto.WordBookMaraiMoozhiYouTubeDTO(b.bookName AS bookName,"
			+ " w.wordName AS wordName, m.maraiMoozhiName AS maraiMoozhiName, " + "y.youTubetitle AS youTubeName) "
			+ "FROM Word w " + "JOIN w.books b " + "JOIN w.maraimoozhis m " + "JOIN w.youTubeVideos y")
	List<WordBookMaraiMoozhiYouTubeDTO> findWordBookMaraiMoozhiYouTube();
}
