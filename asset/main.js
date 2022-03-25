/* 
    Nama project : Ultah Hasna
    Dibuat oleh : Cipta Fikri as Ayang
    Pesan : Jangan diperjual belikan, karena ini adalah project khusus untuk Hasna!!!
*/

$(document).ready(function () {
    // Waktu
    const detik = 1000;
    const menit = detik * 60;
    const jam = menit * 60;
    const hari = jam * 24;

    // Variabel Tampil Waktu
    const hari_ = $("#hari");
    const jam_ = $("#jam");
    const menit_ = $("#menit");
    const detik_ = $("#detik");

    // Tanggal dan Waktu
    let ultah = "Mar 25, 2022 16:01:55";
    let hitungMundur = new Date(ultah).getTime();
    let x = setInterval(function () {
        let sekarang = new Date().getTime();
        jarak = hitungMundur - sekarang;

        // Tampil hari jam menit detik
        hari_.text(Math.floor(jarak / (hari)));
        jam_.text(Math.floor((jarak % (hari)) / (jam)));
        menit_.text(Math.floor((jarak % (jam)) / (menit)));
        detik_.text(Math.floor((jarak % (menit)) / detik));

        // Kalo waktunya pas
        if (jarak < 0) {
            $("#container").addClass("tampil");
            $("#birthday").removeClass("tampil");
            $("#waktu").remove();
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'asset/style.css'));
            $('.start').click(function () {

                $.playSound('asset/musik/ultah.mp3');
                $('.stage1').fadeOut();
                fire_modal('asset/img/cake_modal.png', 'Mari buat kue ulang tahun Hasna!', 'Karena ini udah malem, jadi Hasna buat kue ulang tahun secara digital sendiri aja yaa hehehe. Untuk membuat kuenya, mulai dari mengaduk adonan kue yang Hasna buat, panggang didalam oven dan terakhir Hasna bisa hias sesuai kemauan Hasna. Sebelumnya selamat ulang tahun yaa Sayangg! semoga ayang suka sama hadiahnya!');
                
            })

            progress = 1;

            $('.modal_content button').click(function () {
                progress++;
                close_modal(progress)
            })

            function close_modal(callback) {
                modal.css('transform', 'translateY(-50%) scale(0)')
                setTimeout(function () {
                    $('.stage' + callback).fadeIn();
                }, 600)
            }


            function fire_modal(imgurl, title, content) {

                modal = $('.birthday_inner__modal');
                modal.find('h1').html(title);
                modal.find('img').attr('src', imgurl);
                modal.find('p').html(content);
                setTimeout(function () {
                    modal.css('transform', 'translateY(-50%) scale(1)')
                }, 1000)


            }


            mixing = false;
            mixtimes = 0;

            $('.mixer').click(function () {
                if (mixing == false) {
                    mixing = true
                    mixtimes++;
                    $('.mix_spoon img').addClass('move')
                    setTimeout(function () {
                        $('.mix_spoon img').removeClass('move')
                        mixing = false;
                    }, 1000)
                    $mix_count = document.getElementById('mix-count');
                    $mix_count.innerHTML = String(mixtimes);
                }
                if (mixtimes == 18) {
                    $('.stage2').fadeOut();
                    fire_modal('asset/img/mix_modal.png', 'Adonan sudah merata!', 'Yeyyy, adonannya sudah merata! Sekarang mari ketahap pembuatan kue selanjutnya');

                }

            })

            $('.tin').draggable({
                revert: true
            })
            $(".oven").droppable({
                drop: function (event, ui) {
                    $('.stage3').fadeOut();
                    fire_modal('asset/img/oven_modal.png', 'Berhasil dipanggang!', 'Asikk, Hasna jago sekali. Semuanya sudah terpanggang dengan baik dan adonannya terlihat sangat enak. Sekarang waktunya Hasna menghias kue ulang tahun Hasna dengan menambahkan beberapa hal seperti lemon, krim, coklat dll.');
                }
            })

            bases = 0;
            fillings = 0;

            $('.sponges .item_inner').click(function () {
                $('.sponges').addClass('inactive')
                $('.fillings').removeClass('inactive')
                t = $(this).attr('class').split(' ').pop();
                let add_button = document.getElementsByClassName('add')[0];
                bases++
                if (bases < 6) {
                    add_sponge(t)
                }

                if (fillings <= bases){
                    add_button.disabled = true;
                }
                else{
                    add_button.disabled = false;
                }
            })

            $('.fillings .item_inner').click(function () {
                $('.fillings').addClass('inactive')
                $('.sponges').removeClass('inactive')
                f = $(this).attr('class').split(' ').pop();
                let add_button = document.getElementsByClassName('add')[0];
                fillings++
                if (fillings < 7) {
                    add_filling(f)
                }

                if (fillings <= bases){
                    add_button.disabled = true;
                }
                else{
                    add_button.disabled = false;
                }
            })

            function add_sponge(t) {

                $('.cakemake').prepend('<div style="width:' + (200 - (bases * 20)) + 'px" class="sponge sponge-' + t + '"><div></div><div></div><div></div><div></div><div></div></div>')
                $('.sponges h5 span').html(bases)
            }

            $('.startagain').click(function () {
                $('.cakemake').html('<div class="base"></div>');
                bases = 0;
                fillings = 0;
                $('.sponges h5 span').html(bases)
                $('.fillings h5 span').html(fillings)
                $('.fillings').removeClass('inactive')
                $('.sponges').addClass('inactive')
            })

            function add_filling(f) {
                
                $('.cakemake').prepend('<div style="width:' + (200 - (bases * 20)) + 'px" class="filling filling-' + f + '"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>')
                $('.fillings h5 span').html(fillings)
            }

            function fin() {
                $('h1,h2,.options,.startagain,.add').fadeOut();

                setTimeout(function () {
                    $('.cakemake').fadeIn()
                    $('.cakemake').animate({
                        'margin-top': '0px'
                    })
                }, 1000)
                add_candle()
                $('svg').addClass('text')
            }

            function add_candle() {
                var stages = $('.cakemake > div').length;
                var h = (stages / 2) * 41 + 22 + 'px';
                console.log(stages)
                $('.cakemake').prepend('<div class="candle" ><img src="asset/img/candle.png" width="320" /></div>')
                $('svg').show()
                setTimeout(function () {
                    $('.sa').fadeIn()
                }, 2200)
                confetti.start();
            }

            $('.add').click(function () {
                fin();
            })

            $('.sa').click(function () {
                $.stopSound();
                $.playSound('asset/musik/Mine.mp3');
                Swal.fire({
                    width: 880,
                    imageUrl: 'asset/img/ayang/tampil-1.jpg',
                    imageWidth: 816,
                    imageHeight: 480,
                    imageAlt: 'Custom image',
                    background: '#fff',
                    allowOutsideClick: false,
                    backdrop: `
                    rgba(0,0,123,0.4)
                    url("asset/img/ayang/gif1.gif")
                    center left
                    no-repeat`
                }).then(function(){
                    Swal.fire({
                        width: 880,
                        imageUrl: 'asset/img/ayang/tampil-2.jpg',
                        imageWidth: 816,
                        imageHeight: 480,
                        imageAlt: 'Custom image',
                        background: '#fff',
                        allowOutsideClick: false,
                        backdrop: `
                        rgba(0,0,123,0.4)
                        url("asset/img/ayang/gifutama.gif")
                        center left
                        no-repeat`
                    }).then(function(){
                        Swal.fire({
                            width: 880,
                            imageUrl: 'asset/img/ayang/tampil-3.jpg',
                            imageWidth: 816,
                            imageHeight: 480,
                            imageAlt: 'Custom image',
                            background: '#fff',
                            allowOutsideClick: false,
                            backdrop: `
                            rgba(0,0,123,0.4)
                            url("asset/img/ayang/beruang.gif")
                            center left
                            no-repeat`
                        }).then(function() {
                            Swal.fire({
                                width: 880,
                                imageUrl: 'asset/img/ayang/tampil-4.jpg',
                                imageWidth: 816,
                                imageHeight: 480,
                                imageAlt: 'Custom image',
                                background: '#fff',
                                allowOutsideClick: false,
                                backdrop: `
                                rgba(0,0,123,0.4)
                                url("asset/img/ayang/bebek-lilin.gif")
                                center left
                                no-repeat`
                            }).then(function() {
                                window.location = 'https://wa.wizard.id/0053bc';
                            })
                        })
                    })
                })

                

                

                
            })
            clearInterval(x);
        }
    }, 0)
});
